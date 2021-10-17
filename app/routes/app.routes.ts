import { RoutingComponents } from "./routing.components"

export class AppRoutes {

  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];

  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
    /**
     * GET APIs list
    */

    this.AppGetRoutes = [
      {
        path: "/books",
        component: [
          routingComponents.getBooksAll.bind(routingComponents)
        ]
      },
      {
        path: "/book/:bookUuid",
        component: [
          routingComponents.getBookByBookUuid.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
     * POST APIs list
    */
    this.AppPostRoutes = [
      {
        path: "/book/add",
        component: [
          routingComponents.addBook.bind(routingComponents)
        ]
      },
      {
        path: "/book/:bookUuid/update",
        component: [
          routingComponents.updateBookByBookUuid.bind(routingComponents)
        ]
      },
      {
        path: "/book/:bookUuid/delete",
        component: [
          routingComponents.deleteBookByBookUuid.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }

    ];

    this.AppUpdateRoutes = [
      /**
       * DELETE APIs list
      */
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }

    ];

    /**
     * DELETE APIs list
    */
    this.AppDeleteRoutes = [
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }

    ];
  }


}