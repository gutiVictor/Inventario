<?php
require_once '../../config/database.php';

class Personal {
    private $conn;
    private $table_name = "personal";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear nuevo personal
    public function crear($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                (nombre, apellido, cargo, departamento, correo_electronico, 
                telefono, id_ubicacion) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['nombre'],
            $data['apellido'],
            $data['cargo'],
            $data['departamento'],
            $data['correo_electronico'],
            $data['telefono'],
            $data['id_ubicacion']
        ]);
    }

    // Obtener todo el personal
    public function obtenerTodos() {
        $query = "SELECT p.*, u.nombre_ubicacion 
                 FROM " . $this->table_name . " p 
                 LEFT JOIN ubicaciones u ON p.id_ubicacion = u.id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener personal por ID
    public function obtenerPorId($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar personal
    public function actualizar($id, $data) {
        $query = "UPDATE " . $this->table_name . " 
                SET nombre = ?, apellido = ?, cargo = ?, departamento = ?,
                    correo_electronico = ?, telefono = ?, id_ubicacion = ?
                WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['nombre'],
            $data['apellido'],
            $data['cargo'],
            $data['departamento'],
            $data['correo_electronico'],
            $data['telefono'],
            $data['id_ubicacion'],
            $id
        ]);
    }

    // Eliminar personal
    public function eliminar($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$id]);
    }
}
?>
