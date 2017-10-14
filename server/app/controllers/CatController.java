package controllers;

import apiclient.DynamoDb;
import apiclient.ReverseGeo;
import com.typesafe.config.Config;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


public class CatController extends Controller {
    private DynamoDb db;
    private ReverseGeo rev;
    private String catName;

    @Inject
    public CatController(DynamoDb db, ReverseGeo rev, Config conf) {
        this.db = db;
        this.rev = rev;
        catName = conf.getString("cat.name");
    }

    public CompletionStage<Result> updatePosition(double lon, double lat) {
        return rev.reverseLookup(lon, lat).thenApply(s -> {
            Logger.info("New position lon=" + lon + " lat=" + lat + " (" + s + ")");
            db.putData(catName, lon, lat, s);
            return ok();
        });
    }
}
