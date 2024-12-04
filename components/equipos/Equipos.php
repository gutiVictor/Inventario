<?php
require_once '../../config/database.php';

class Equipos {
    private $conn;
    private $table_name = "equipos";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear nuevo equipo
    public function crear($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                (tipo_equipo, marca, modelo, numero_serie, fecha_adquisicion, 
                estado, id_ubicacion, id_responsable, observaciones) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['tipo_equipo'],
            $data['marca'],
            $data['modelo'],
            $data['numero_serie'],
            $data['fecha_adquisicion'],
            $data['estado'],
            $data['id_ubicacion'],
            $data['id_responsable'],
            $data['observaciones']
        ]);
    }

    // Obtener todos los equipos
    public function obtenerTodos() {
        $query = "SELECT e.*, u.nombre_ubicacion, CONCAT(p.nombre, ' ', p.apellido) as responsable 
                 FROM " . $this->table_name . " e 
                 LEFT JOIN ubicaciones u ON e.id_ubicacion = u.id 
                 LEFT JOIN personal p ON e.id_responsable = p.id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener equipo por ID
    public function obtenerPorId($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar equipo
    public function actualizar($id, $data) {
        $query = "UPDATE " . $this->table_name . " 
                SET tipo_equipo = ?, marca = ?, modelo = ?, numero_serie = ?,
                    fecha_adquisicion = ?, estado = ?, id_ubicacion = ?,
                    id_responsable = ?, observaciones = ?
                WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['tipo_equipo'],
            $data['marca'],
            $data['modelo'],
            $data['numero_serie'],
            $data['fecha_adquisicion'],
            $data['estado'],
            $data['id_ubicacion'],
            $data['id_responsable'],
            $data['observaciones'],
            $id
        ]);
    }

    // Eliminar equipo
    public function eliminar($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$id]);
    }
}
?>
