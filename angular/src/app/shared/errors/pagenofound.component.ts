import { Component } from '@angular/core';

@Component({
  selector: 'app-pagenofound',
  template: `
    <section id="wrapper" class="error-page">
      <div class="error-box">
        <div class="error-body text-center">
          <h1>404</h1>
          <h3 class="text-uppercase">Page Not Found !</h3>
          <p class="text-muted m-t-30 m-b-30">
            YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
          </p>
          <a
            href="index.html"
            class="btn btn-info btn-rounded waves-effect waves-light m-b-40"
            >Back to home</a
          >
        </div>
        <footer class="footer text-center">© {{ year }} Admin Pro.</footer>
      </div>
    </section>
  `,
  styles: [`.error-box {
      height: 100%;
      position: fixed;
      background: url(../../../assets/images/error-bg.jpg) no-repeat center center #fff;
      width: 100%;
    }
    
    .error-box .footer {
      width: 100%;
      left: 0px;
      right: 0px;
    }
    
    .error-body {
      padding-top: 5%;
    }
    
    .error-body h1 {
      font-size: 210px;
      font-weight: 900;
      text-shadow: 4px 4px 0 #ffffff, 6px 6px 0 #263238;
      line-height: 210px;
    }
    
    .error-page {
      width: 100%;
    }`],
})
export class PagenofoundComponent {

  year = new Date().getFullYear();

}
