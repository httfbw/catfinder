package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


public class CatController extends Controller {
    public CompletionStage<Result> updatePosition(double lon, double lat) {

        return CompletableFuture.completedFuture(ok());
    }
}
