<style>
    .main-sidebar a {
        cursor: pointer;
    }
</style>
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li class="header">MAIN NAVIGATION</li>
            <li ng-repeat="menu in menuItems" ng-class="{ active: hasActiveMenu(menu.active), treeview : menu.childs.length > 0}">
                <a ui-sref="{{menu.id}}">
                    <i class="{{menu.icon}}"></i> <span>{{menu.label}}</span>
                </a>
                <ul class="treeview-menu" ng-if="menu.childs.length > 0">
                    <li ng-repeat="sub in menu.childs" ng-class="{ active: hasActiveMenu(sub.active)}">
                        <a ui-sref="{{sub.id}}">
                            <i class="{{sub.icon}}"></i> <span>{{sub.label}}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>