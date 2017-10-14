package apiclient;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.google.common.collect.ImmutableMap;
import com.typesafe.config.Config;

import javax.inject.Inject;
import java.util.Map;


public class DynamoDb {
    String tableName;
    AWSCredentials credentials;

    @Inject
    public DynamoDb(Config cfg) {
        tableName = cfg.getString("aws.tablename");
        String accessKey = cfg.getString("aws.accessKey");
        String secretKey = cfg.getString("aws.secretKey");
        credentials = new BasicAWSCredentials(accessKey, secretKey);
    }

    public void putData(String name, double lon, double lat, String location) {
        AmazonDynamoDB db = AmazonDynamoDBClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.EU_WEST_1)
                .build();
        Map<String, AttributeValue> item = ImmutableMap.<String, AttributeValue>builder()
                .put("name", new AttributeValue(name))
                .put("lon", new AttributeValue(Double.toString(lon)))
                .put("lat", new AttributeValue(Double.toString(lat)))
                .put("location", new AttributeValue(location))
                .build();
        db.putItem(tableName, item);
    }
}
