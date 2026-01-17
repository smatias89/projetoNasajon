<?php

require_once "admin/WriteLog.php";

if(!isset($_SESSION))
{
  session_start();
    
    
  // function parse_path() {
  //   $path = array();
  //   if (isset($_SERVER['REQUEST_URI'])) {
  //     $path = $_SERVER['REQUEST_URI'];
  //   }
    
  //   $indexSecondDash = strpos($path,"/",1);
    
  //   if ($indexSecondDash > 0) {
  //     $path = substr($path,1, $indexSecondDash-1);
  //   } else {
  //     $path = "";
  //   }
    
  //   return $path;
  // }
  
  // $path_info = parse_path();
  
  // // WriteLog::getInstance()->writeLog(serialize($path_info));
  
  // if (isset($_SERVER['REQUEST_URI'])) {
  //     $request_path = explode('?', $_SERVER['REQUEST_URI']);
      
  // }
    
  // $schoolName = "";

  // if (isset($_SESSION["lstSchool"]) && ($_SESSION["lstSchool"] != null || $_SESSION["lstSchool"] == null)) {
  //   $lstSchool = json_decode($_SESSION["lstSchool"]);
    
  //   $blnAllowed = False;
  //   for ($countSchool = 0; $countSchool < count($lstSchool); $countSchool++) {
  //     /*echo var_dump($lstSchool[$countSchool]);*/
  //     if ($lstSchool[$countSchool]->schoolSitePrefix == $path_info) {
  //       $blnAllowed = True;
  //       $schoolName = $lstSchool[$countSchool]->schoolName;
  //       break;
  //     }
  //   }
    
  //   if (!$blnAllowed) {
  //     header("Location:" . "/login");
  //   }
      
  // } else {
      
  //   if (!$blnAllowed) {
  //     header("Location:" . "/login");
  //   }
      
  // }

  // if (!isset($_SESSION["schoolSitePrefix"]) || $path_info != $_SESSION["schoolSitePrefix"]) {

  //   // header("Location:" . "ajax/loginRefresh");

  // }

  // if (isset($_SESSION["lstPermission"]) && ($_SESSION["lstPermission"] != null || $_SESSION["lstPermission"] == null)) {
        
  //     $lstPermission = json_decode($_SESSION["lstPermission"]);
      
  //     $blnAllowedView = False;
  //     $blnAllowedSave = False;
  //     $blnAllowedDelete = False;
  //     for ($countPermission = 0; $countPermission < count($lstPermission); $countPermission++) {
  //       /*echo var_dump($lstSchool[$countSchool]);*/
  //       if ($lstPermission[$countPermission] == "VIEW_STAFF" || $lstPermission[$countPermission] == "VIEW_TEACHER" || $lstPermission[$countPermission] == "VIEW_RESPONSIBLE") {
  //         $blnAllowedView = True;                
  //       } else if ($lstPermission[$countPermission] == "SAVE_STAFF") {
  //         $blnAllowedSave = True;
  //       } else if ($lstPermission[$countPermission] == "DELETE_STAFF") {
  //         $blnAllowedDelete = True;
  //       }
        
  //       if ($blnAllowedView && $blnAllowedSave && $blnAllowedDelete)
  //         break;
          
  //     }
      
  //     if (!$blnAllowedView) {
  //       header("Location:" . "index");
  //     }
      
  // }

  // $studentName = "";
  // $studentID = "";
  // $staffSegmentUserID = "";
  // $classRoomStudentID = "";
  // $staffSegmentName = "";
  // $staffSegmentID = "";

  // if (isset($_SESSION["lstResponsibleStudent"]) && ($_SESSION["lstResponsibleStudent"] != null || $_SESSION["lstResponsibleStudent"] == null)) {
        
  //   // $lstResponsibleStudent = json_decode($_SESSION["lstResponsibleStudent"]);
    
  //   if(isset($_SESSION["lstResponsibleStudent"]["studentUserID"]) && $_SESSION["lstResponsibleStudent"]["studentUserID"] != null){

  //     $studentID = ($_SESSION["lstResponsibleStudent"]["studentUserID"]);

  //   }

  //   if(isset($_SESSION["lstResponsibleStudent"]["studentFullName"]) && $_SESSION["lstResponsibleStudent"]["studentFullName"] != null){

  //     $studentName = ($_SESSION["lstResponsibleStudent"]["studentFullName"]);

  //   }

  //   if(isset($_SESSION["lstResponsibleStudent"]["staffSegmentUserID"]) && $_SESSION["lstResponsibleStudent"]["staffSegmentUserID"] != null){

  //     $staffSegmentUserID = ($_SESSION["lstResponsibleStudent"]["staffSegmentUserID"]);

  //   }

  //   if(isset($_SESSION["lstResponsibleStudent"]["staffSegmentName"]) && $_SESSION["lstResponsibleStudent"]["staffSegmentName"] != null){

  //     $staffSegmentName = ($_SESSION["lstResponsibleStudent"]["staffSegmentName"]);

  //   }

  //   if(isset($_SESSION["lstResponsibleStudent"]["staffSegmentID"]) && $_SESSION["lstResponsibleStudent"]["staffSegmentID"] != null){

  //     $staffSegmentID = ($_SESSION["lstResponsibleStudent"]["staffSegmentID"]);

  //   }

  //   if(isset($_SESSION["lstResponsibleStudent"]["classRoomStudentID"]) && $_SESSION["lstResponsibleStudent"]["classRoomStudentID"] != null){

  //     $classRoomStudentID = ($_SESSION["lstResponsibleStudent"]["classRoomStudentID"]);

  //   }
    
  //   if (!$blnAllowedView) {
  //     // header("Location:" . "index");
  //   }
    
  // }




}
echo '<pre>';
print_r($_SESSION);
echo '</pre>';
?>

