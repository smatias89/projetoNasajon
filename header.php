<?php

?>

<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <!--<li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>-->
    </ul>

    <!-- Right navbar links -->    
    <ul class="navbar-nav ml-auto">
      <li id='navItemCount' class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge" id='totalNotification'></span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header" id='totalNotificationText'></span>
          <div class="dropdown-divider"></div>
          <a href="messageBookSelect" class="dropdown-item">
            <i class="far fa-address-book mr-2"></i> <span id='totalMessageBook'></span>
            <!-- <span class="float-right text-muted text-sm">3 mins</span> -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="bips" class="dropdown-item">
            <i class="far fa-comments mr-2"></i> <span id='totalBip'></span>
            <!-- <span class="float-right text-muted text-sm">12 hours</span> -->
          </a>
        </div>
      </li>


      <li class="nav-item">
        <a class="nav-link" href="#" role="button" title="Sign Out" id="logout">
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </li>  

    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index" class="brand-link">
      <img src="nasajon/img/nasajon.png" alt="AdminLTE Logo" class="brand-image" style="opacity: .8;max-height: 28px">
      <span class="brand-text font-weight-light"></span>
    </a>

    <?php
        include 'leftmenu.php';
    ?>
