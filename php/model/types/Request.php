<?php
class Request {
    public $id, $data, $param;

    public function __construct($data = null, int $id = null, string $param = null) {
        $this->id = $id;
        $this->data = $data;
        $this->param = $param;
    }
}
?>