<?php
class Home extends Controller {
    public function __construct(){
        parent::__construct();
    }

    public function index()
    {
        $data['title'] = 'Iniciar Sesión';
        $this->views->View('principal', 'login' , $data );

    }
}
?>