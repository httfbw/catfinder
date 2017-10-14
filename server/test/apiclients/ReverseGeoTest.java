package apiclients;

import apiclient.ReverseGeo;
import org.junit.Test;
import play.test.WithApplication;

import java.util.concurrent.ExecutionException;


public class ReverseGeoTest extends WithApplication {
    @Test
    public void testLookup() throws ExecutionException, InterruptedException {
        double[] weg = new double[] {48.778533, 9.277715,
                48.777765, 9.277794,
                48.777284, 9.278159,
                48.777263, 9.278277,
                48.776613, 9.278781,
                48.776210, 9.278792,
                48.776309, 9.278116,
                48.776309, 9.278116,
                48.776641, 9.276743,
                48.776761, 9.276356,
                48.777023, 9.275702};

        ReverseGeo rl = provideApplication().injector().instanceOf(ReverseGeo.class);

        for (int i=0; i<weg.length/2; i++) {
            String result = rl.reverseLookup(weg[i*2+1], weg[i*2]).toCompletableFuture().get();
            System.out.println(result);
        }
    }
}
