<?php
require_once '../../config/database.php';

class Ubicaciones {
    private $conn;
    private $table_name = "ubicaciones";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear nueva ubicación
    public function crear($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                (nombre_ubicacion, direccion, ciudad, pais, codigo_postal) 
                VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['nombre_ubicacion'],
            $data['direccion'],
            $data['ciudad'],
            $data['pais'],
            $data['codigo_postal']
        ]);
    }

    // Obtener todas las ubicaciones
    public function obtenerTodas() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener ubicación por ID
    public function obtenerPorId($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar ubicación
    public function actualizar($id, $data) {
        $query = "UPDATE " . $this->table_name . " 
                SET nombre_ubicacion = ?, direccion = ?, ciudad = ?,
                    pais = ?, codigo_postal = ?
                WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['nombre_ubicacion'],
            $data['direccion'],
            $data['ciudad'],
            $data['pais'],
            $data['codigo_postal'],
            $id
        ]);
    }

    // Eliminar ubicación
    public function eliminar($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$id]);
    }
}
?>
