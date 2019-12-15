import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { HomePageService } from "./homepage.service";

const baseUrl: string = config.url;
import { config } from "config";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;

  slides = [
    {
      img: "assets/images/1280_iXpress Logo_V2-23 (1).jpg",
      description:
        "iXpress Connect – A new way of Banking! Engage yourself in the revolutionary way of getting on-boarded for API based solutions and make your journey quick yet simple and seamless. iXpress Connect provides you a self-service platform to ‘design & develop’ and ‘test & try’ on the fly. Make changes, see what best suits your requirements with full freedom and go live when you are ready. Banking with ICICI, now at your fingertips."
    },
    { img: "assets/images/iXC_1-2-3.JPG" },
    {
      img: "assets/images/eCollection.png"
    },
    {
      img: "assets/images/iSurePay.png"
    }
    // { img: "assets/images/ecol1.png" },
    // { img: "assets/images/ecol2.png" },
    // { img: "assets/images/ecol3.png" },
    // { img: "assets/images/ecol4.png" },
    // { img: "assets/images/isure1.png" },
    // { img: "assets/images/isure2.png" }
  ];
  public slideConfig = {
    dots: false,
    infinite: false,
    nextArrow: '<div class="homenav-btn next-slide"></div>',
    prevArrow: '<div class="homenav-btn prev-slide"></div>',
    slidesToShow: 2,
    speed: 100,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  options = {
    theme: "light", // two possible values: light, dark
    dir: "ltr", // two possible values: ltr, rtl
    layout: "vertical", // fixed value. shouldn't be changed.
    sidebartype: "full", // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: "fixed", // two possible values: fixed, absolute
    headerpos: "fixed", // two possible values: fixed, absolute
    boxed: "full", // two possible values: full, boxed
    navbarbg: "skin1", // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: "skin6", // six possible values: skin(1/2/3/4/5/6)
    logobg: "skin6" // six possible values: skin(1/2/3/4/5/6)
  };
  productData: any;
  public navbarOpen: boolean;
  product: any;
  configURL = config.url;
  data;
  constructor(
    private router: Router,
    private homePageService: HomePageService
  ) {
    // customize default values of carousels used by this component tree
    //  config.interval = 100000;
    //  config.wrap = false;
    //  config.keyboard = false;
    //  config.pauseOnHover = false;
    //  config.showNavigationArrows = true;
    //  config.showNavigationIndicators = true;
  }

  ngOnInit() {
    localStorage.clear();
    this.homePageService.getProducts().then(data => {
      this.productData = data;
      // console.log("this.productData", this.productData);
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  clickSubscription() {
    alert("Please Select One of the featured products below.");
  }
  onClick(data) {
    console.log("Data ==>", data);
    localStorage.setItem("productId", data.productId);
    localStorage.setItem("productName", data.productName);
    localStorage.setItem("description", data.description);
    this.data = JSON.stringify(data);
    localStorage.setItem("productData", this.data);
    this.router.navigateByUrl("/authentication/Product");
  }

  slickInit(e) {
    // console.log("slick initialized");
  }

  breakpoint(e) {
    // console.log("breakpoint");
  }

  afterChange(e) {
    // console.log("afterChange");
  }

  beforeChange(e) {
    // console.log("beforeChange");
  }
}
