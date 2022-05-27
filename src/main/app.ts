import {
  Catch,
  Controller,
  ExceptionContext,
  ExceptionFilter,
  GET,
  MandarineCore,
  MandarineRepository,
  Middleware,
  MiddlewareTarget,
  Repository,
  ResponseParam,
} from "mandarinets";

@Catch(Error)
export class MyCatchComponent implements ExceptionFilter<Error> {
  catch(exceptionContext: ExceptionContext<Error>) {
    console.log("An error has occured");

    exceptionContext.getResponse().body = {
      msg: exceptionContext.getException().toString(),
    };
  }
}

class YourModel {}

@Repository()
export abstract class MyRepository extends MandarineRepository<YourModel> {
  constructor() {
    super(YourModel);
  }
}

@Middleware(new RegExp("/api/*"))
export class Middleware1 implements MiddlewareTarget {
  public onPreRequest(@ResponseParam() response: unknown): boolean {
    console.log(response);
    return true;
  }

  public onPostRequest(): void {}
}

@Controller("/api")
export class Boo {
  @GET("/number")
  public helloWorld(): number {
    return Math.random();
  }
}

new MandarineCore().MVC().run();
