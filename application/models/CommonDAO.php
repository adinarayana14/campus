<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of CommonDAO
 *
 * @author Adinarayana.I
 */
class CommonDAO extends CI_Model {

    public function __construct() {
        // Call the CI_Model constructor
        parent::__construct();
    }

    public function get_all_records($table) {
        $query = $this->db->get($table);
        return $query->result();
    }

    public function get_limit_records($table, $where, $orderby, $start, $limit) {
        if (!empty($where) && !is_null($where)) {
            $this->db->where($where);
        }
        if (!is_null($orderby)) {
            foreach ($orderby as $key => $value) {
                $this->db->order_by($key, $value);
            }
        }
        if (!is_null($limit)) {
            $this->db->limit($limit, $start);
        }
        $query = $this->db->get($table);
        return $query->result_array();
    }

    public function get_randam_records($table, $limit) {
        if (!is_null($limit)) {
            $this->db->order_by('', 'RANDOM');
            $this->db->limit($limit);
        }
        $query = $this->db->get($table);
        return $query->result();
    }

    public function get_record($table, $id) {
        $this->db->from($table);
        $this->db->where('id', $id);
        $queryData = $this->db->get();
        $data = array();
        if ($queryData->num_rows() > 0) {
            $data = $queryData->row_array();
        }
        return $data;
    }

    public function get_record_by_title($table, $id) {
        $this->db->from($table);
        $this->db->where('title', $id);
        $queryData = $this->db->get();
        $data = array();
        if ($queryData->num_rows() > 0) {
            $data = $queryData->row_array();
        }
        return $data;
    }

    public function save_or_update_record($table, $formData, $id) {
        if ($id == 0) {
            $this->db->insert($table, $formData);
            return $this->db->insert_id();
        } else {
            $this->db->where("id", $id);
            $this->db->update($table, $formData);
            return $id;
        }
    }

    public function save_record($table, $formData) {
        $this->db->insert($table, $formData);
        return $this->db->insert_id();
    }

    public function delete_record($table, $id) {
        $this->db->where("id", $id);
        $this->db->delete($table);
        return $id;
    }

    public function delete_record_by_condition($table, $where) {
        $this->db->where($where);
        $this->db->delete($table);
    }

    public function getDataFromInnerJoin($select, $maintable, $jointables, $where, $orderby, $disnct) {
        if (!is_null($select)) {
            $this->db->select($select);
        }
        $this->db->from($maintable);
        if (!is_null($jointables)) {
            foreach ($jointables as $key => $value) {
                $this->db->join($key, $value, 'INNER');
            }
        }
        if (!empty($where) && !is_null($where)) {
            $this->db->where($where);
        }
        if (!is_null($orderby)) {
            foreach ($orderby as $key => $value) {
                $this->db->order_by($key, $value);
            }
        }
        if ($disnct == TRUE) {
            $this->db->distinct();
        }
        $query = $this->db->get();
        return $query->result_array();
    }

    public function get_records_by_join($select, $maintable, $jointables, $where, $orderby, $limit, $disnct, $start, $limit) {
        return $this->get_records_by_join_type($select, $maintable, $jointables, "INNER", $where, $orderby, $disnct, $start, $limit);
    }

    public function get_records_by_join_type($select, $maintable, $jointables, $jonType, $where, $orderby, $disnct, $start, $limit) {
        if (!is_null($select)) {
            $this->db->select($select);
        }
        $this->db->from($maintable);
        if (!is_null($jointables)) {
            if(is_null($jonType)) {
                $jonType = "INNER";
            }
            foreach ($jointables as $key => $value) {
                $this->db->join($key, $value, $jonType);
            }
        }
        if (!empty($where) && !is_null($where)) {
            $this->db->where($where);
        }
        if (!is_null($orderby)) {
            foreach ($orderby as $key => $value) {
                $this->db->order_by($key, $value);
            }
        }
        if ($disnct == TRUE) {
            $this->db->distinct();
        }
        if (isset($limit) && !is_null($limit)) {
            $this->db->limit($limit, $start);
        }
        $query = $this->db->get();
        return $query->result_array();
    }

    public function countDataFromInnerJoin($select, $maintable, $jointables, $where, $orderby, $disnct) {
        if (!is_null($select)) {
            $this->db->select($select);
        }
        $this->db->from($maintable);
        if (!is_null($jointables)) {
            foreach ($jointables as $key => $value) {
                $this->db->join($key, $value, 'INNER');
            }
        }
        if (!empty($where) && !is_null($where)) {
            $this->db->where($where);
        }
        if (!is_null($orderby)) {
            foreach ($orderby as $key => $value) {
                $this->db->order_by($key, $value);
            }
        }
        if ($disnct == TRUE) {
            $this->db->distinct();
        }
        return $this->db->count_all_results();
    }

    public function count_record_by_upper($table, $where) {
        $this->db->from($table);
        $this->db->where($where);
        return $this->db->count_all_results();
    }

    public function get_record_by_upper($table, $where) {
        $this->db->from($table);
        foreach ($where as $key => $value) {
            $this->db->where($key, $value);
        }
        $queryData = $this->db->get();
        $data = array();
        if ($queryData->num_rows() > 0) {
            $data = $queryData->row_array();
        }
        return $data;
    }

    public function get_records_by_query($query) {
        $queryData = $this->db->query($query);
        return $queryData->result_array();
    }

}
