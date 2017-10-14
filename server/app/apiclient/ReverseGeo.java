package apiclient;

import org.w3c.dom.Document;
import play.Logger;
import play.libs.ws.WSClient;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;


public class ReverseGeo {
    private WSClient ws;

    @Inject
    public ReverseGeo(WSClient ws) {
        this.ws = ws;
    }

    public CompletionStage<String> reverseLookup(double lon, double lat) {
        return ws.url("https://nominatim.openstreetmap.org/reverse?format=xml&lat=" + Double.toString(lat) +
                        "&lon=" + Double.toString(lon) +
                "&zoom=18&addressdetails=1")
                .get().thenApply(resp -> {
                    Document doc = resp.asXml();

                    if (doc.getElementsByTagName("road").getLength()>0) {
                        return doc.getElementsByTagName("road").item(0).getTextContent();
                    }
                    Logger.debug("Failed lookup. XML was: " + resp.getBody());
                    return "?";
        });
    }
}
