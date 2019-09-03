<?php
    namespace App\Http\Controllers\API;

    use Illuminate\Http\Request;
    use App\Http\Controllers\API\BaseController as BaseController;
    use App\models\Privilege;
    use Illuminate\Support\Facades\Auth;

    class PrivilegeController extends BaseController
    {

        public function list() {
            try {
                $data = Privilege::all();

                return $this->sendResponse($data, 'Privilege List');
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function create(Request $request) {
            try {
                $data            = $request->all();
                $data['user_id'] = Auth::id();
                $coupon          = Privilege::create($data);
                if($coupon) {
                    return $this->sendResponse($coupon, 'Privilege Created Successfully');
                }
                else {
                    return $this->sendError($coupon, 'Privilege can not update Successfully');
                }
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function update(Request $request) {
            try {
                $this->validate($request, ['privilege_id' => 'exists:privilege,privilege_id']);
                $coupon = Privilege::findOrFail($request['privilege_id']);
                $coupon->update($request->all());
                if($coupon) {
                    return $this->sendResponse($coupon, 'Privilege Updated Successfully');
                }
                else {
                    return $this->sendError($coupon, 'Privilege can not updat Successfully');
                }
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }

        public function delete(Request $request) {
            try {
                $this->validate($request, ['privilege_id' => 'exists:privilege,privilege_id',]);
                $coupon = Privilege::find($request['privilege_id'])->delete();
                if($coupon) {
                    return $this->sendResponse($coupon, 'Privilege Deleted Successfully');
                }
                else {
                    return $this->sendError($coupon, 'Privilege Deleted Successfully');
                }
            } catch(\Exception $e) {
                return $this->sendError($e->getMessage(), []);
            }
        }
    }
