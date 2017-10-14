package controllers;

import apiclient.DynamoDb;
import com.typesafe.config.Config;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


public class CatController extends Controller {
    private DynamoDb db;
    private String catName;

    @Inject
    public CatController(DynamoDb db, Config conf) {
        this.db = db;
        catName = conf.getString("cat.name");
    }

    public CompletionStage<Result> updatePosition(double lon, double lat) {
        Logger.info("New position lon=" + lon + " lat=" + lat);
        db.putData(catName, lon, lat);
        return CompletableFuture.completedFuture(ok());
    }
}
