<?php
interface OanNetworksInterface
  extends DrupalEntityControllerInterface {
  public function create();
}

// Oan Network

class OanNetworksController
  extends DrupalDefaultEntityController
  implements OanNetworksInterface {

  public function create(){
    $entity = new stdClass();
    $entity->oan_id = 0;
    $entity->oan_name = '';
    $entity->oan_key = '';
    $entity->oan_secret = '';
    $entity->oan_custom_data = '';
    $entity->oan_hash = '';
    $entity->oan_endpoint = '';
    return $entity;
  }

  public function save($entity){
    $entity->oan_hash = md5( $entity->oan_name. $entity->oan_key. $entity->oan_secret. $entity->oan_custom_data. $entity->oan_endpoint);
    if(empty($entity->oan_id)){
      module_invoke_all('entity_presave', $entity, 'oan');
      $primary_keys = $entity->id ? 'id' : array();
      drupal_write_record('oan_networks', $entity, $primary_keys);
      module_invoke_all('entity_insert', $entity, 'oan');
    }
    else{
      db_update('oan_networks')
      ->fields(array('oan_name' => $entity->oan_name))
      ->fields(array('oan_key' => $entity->oan_key))
      ->fields(array('oan_secret' => $entity->oan_secret))
      ->fields(array('oan_custom_data' => $entity->oan_custom_data))
      ->fields(array('oan_hash' => $entity->oan_hash))
      ->fields(array('oan_endpoint' => $entity->oan_endpoint))
      ->condition('oan_id', $entity->oan_id, '=')
      ->execute();
    }
    return $entity;
  }

  public function delete($entity)
  {
    $this->deleteMultiple(array($entity));
  }
  public function load($entity_id=0, $hash ='') {
    $qresult = db_select( 'oan_networks', 'oan')
      ->fields( 'oan')
      ->range(0, 1);
    if(!empty($entity_id)){
      $qresult->condition( 'oan.oan_id', $entity_id, '=');
    }
    if (!empty( $hash)) {
      $qresult->condition( 'oan.oan_hash', $hash, '=');
    }
    $result = $qresult->execute()-> fetchObject();
    return $result;
  }
  public function get_list($filters = array(), $orders = array()) {
    $result = db_select('oan_networks', 'oan')
    ->fields('oan')
    ->orderBy('oan.oan_id', 'DESC')
    ->execute()
    ->fetchAll();
    return $result;
  }
}
