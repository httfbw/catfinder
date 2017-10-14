name := """catfinder"""
organization := "de.hacktothefuture"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.2"

libraryDependencies ++= Seq(guice, ws)

libraryDependencies += "com.amazonaws" % "aws-java-sdk" % "1.11.213"

javaOptions in Test += "-Dconfig.file=conf/secrets.conf"