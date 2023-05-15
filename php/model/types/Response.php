<?php
class Response {
    public $data, $status, $error;

    public function __construct($data = null, $status = 0, $error = null) {
        $this->data = $data;
        $this->status = $status;
        $this->error = $error;

        if ($error !== null && $status === 0) {
            $this->status = -1;
        }
    }
}
?>