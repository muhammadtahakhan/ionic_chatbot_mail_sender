<?php
    namespace App\Http\Controllers\API;

    use Illuminate\Http\Request;
    use App\Http\Controllers\API\BaseController as BaseController;
    use App\models\Role;
    use Illuminate\Support\Facades\Auth;

    class RoleController extends BaseController
    {

        public function list() {
            try {
                $data = Role::with('privleges')->get();

                return $this->sendResponse($data, 'Roles List');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function listAdmin() {
            try {
                $data = \DB::select("SELECT * FROM `users` usr INNER JOIN role rol ON rol.role_id = usr.role_id WHERE rol.role_type = 'admin'");

                return $this->sendResponse($data, 'Admin List');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function listAgent() {
            try {
                $data = \DB::select("SELECT * FROM `users` usr INNER JOIN role rol ON rol.role_id = usr.role_id WHERE rol.role_type = 'agent'");

                return $this->sendResponse($data, 'Agents List');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function listPublic() {
            try {
                $data = \DB::select("SELECT * FROM `users` usr INNER JOIN role rol ON rol.role_id = usr.role_id WHERE rol.role_type = 'public'");

                return $this->sendResponse($data, 'Public List');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function getOne($id) {
            try {
                $data = Role::where('role_id', $id)->with('privleges')->first();

                return $this->sendResponse($data, 'Roles List');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function assignPrivilege(Request $request) {
            try {
                $data = Role::find($request->role_id);

                $data->privleges()->detach();
                $data =  $data->privleges()->sync($request->privileges);
                return $this->sendResponse($data, 'Privileges Assigned to Role');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function create(Request $request) {
            try {
                $data   = $request->all();
                $coupon = Role::create($data);
                if($coupon) {
                    return $this->sendResponse($coupon, 'Role Created Successfully');
                }
                else {
                    return $this->sendError($coupon, 'Role can not update Successfully');
                }
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function update(Request $request) {
            try {
                $this->validate($request, ['role_id' => 'exists:role,role_id']);
                $coupon = Role::findOrFail($request['role_id']);
                $coupon->update($request->all());
                if($coupon) {
                    return $this->sendResponse($coupon, 'Role Updated Successfully');
                }
                else {
                    return $this->sendError($coupon, 'Role can not updat Successfully');
                }
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function delete(Request $request) {
            try {
                $this->validate($request, ['role_id' => 'exists:role,role_id',]);
                $coupon = Role::find($request['role_id'])->delete();
                if($coupon) {
                    return $this->sendResponse($coupon, 'Role Deleted Successfully');
                }
                else {
                    return $this->sendError($coupon, 'Role Deleted Successfully');
                }
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }
    }
