package apiclients;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.google.common.collect.ImmutableMap;
import org.junit.Test;
import play.test.WithApplication;

import java.util.Map;


public class AwsTest extends WithApplication {
    @Test
    public void testDataUpload() {
        final String tableName = provideApplication().config().getString("aws.tablename");
        final String accessKey = provideApplication().config().getString("aws.accessKey");
        final String secretKey = provideApplication().config().getString("aws.secretKey");
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonDynamoDB db = AmazonDynamoDBClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.EU_WEST_1)
                .build();
        Map<String, AttributeValue> item = ImmutableMap.<String, AttributeValue>builder()
                .put("name", new AttributeValue("Mietze"))
                .put("lon", new AttributeValue("9.236"))
                .put("lat", new AttributeValue("48.7770"))
                .build();
        db.putItem(tableName, item);
    }
}
