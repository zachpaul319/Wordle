<?php
require_once(__DIR__ . "/Database.php");
require_once(__DIR__ . "/types/User.php");

class UserModel {
    public static function createUser(User $user): bool {
        $sql = "INSERT INTO tblUsersWORDLE (username, password, currentLevel, levelsHash) VALUES (?, ?, ?, ?)";
        Database::executeSql($sql, "ssis", array($user->username, $user->password, 1, $user->levelsHash));
        return ! isset(Database::$lastError);
    }

    public static function getUserByUsername($username): User {
        $sql = "SELECT * FROM tblUsersWORDLE WHERE username = ?";
        $results = Database::executeSql($sql, "s", array($username));
        return new User($results[0]);
    }

    public static function incrementLevel(int $userId): bool {
        $sql = "UPDATE tblUsersWORDLE SET currentLevel = currentLevel + 1 WHERE userId = ?";
        Database::executeSql($sql, "i", array($userId));
        return ! isset(Database::$lastError);
    }
}
?>