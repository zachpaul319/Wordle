<?php
require_once(__DIR__ . "/../controller/UsersController.php");
require_once(__DIR__ . "/../model/types/Request.php");
require_once(__DIR__ . "/../model/types/Response.php");
require_once(__DIR__ . "/../lib/Security.php");

$username = $_SERVER["PHP_AUTH_USER"];
$password = $_SERVER["PHP_AUTH_PW"];

header("Content-Type: application/json");
$method = strtolower($_SERVER["REQUEST_METHOD"]);
$path = explode("/", $_SERVER["PATH_INFO"]);

$controller = ucfirst($path[1]) . "Controller";

$data = json_decode(file_get_contents("php://input"));

$request = new Request();
$request->data = $data;

if (method_exists($controller, $method)) {
    if (!($method == "post")) {
        $user = authenticate($username, $password);
        if ($user == null) {
            http_response_code(401);
            die();
        }

        if ($method == "get") {
            $request->data = $user->username;
        }

        if ($method == "patch") {
            $request->id = $path[2];
        }
    }

    $response = call_user_func(array($controller, $method), $request);

    echo json_encode($response);
}
else {
    http_response_code(405);
}
?>