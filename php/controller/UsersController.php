<?php
require_once(__DIR__ . "/../model/types/Request.php");
require_once(__DIR__ . "/../model/types/Response.php");
require_once(__DIR__ . "/../model/types/User.php");
require_once(__DIR__ . "/../model/UserModel.php");
require_once(__DIR__ . "/../lib/Security.php");

class UsersController {
    public static function post(Request $request): Response {
        $user = new User($request->data);
        $user->password = getHashedPassword($user->password);
        $response = new Response();

        if (UserModel::createUser($user)) {
            $response->status = 0;
        } else {
            $response->status = 1;
        }

        return $response;
    }

    public static function get(Request $request): Response {
        $username = $request->data;
        $response = new Response();

        $response->data = UserModel::getUserByUsername($username);
        return $response;
    }

    public static function patch(Request $request): Response {
        $response = new Response();

        if (UserModel::incrementLevel($request->id)) {
            $response->status = 0;
        } else {
            $response->status = 1;
        }

        return $response;
    }
}
?>