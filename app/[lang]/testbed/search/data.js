export const elasticscript = {
  mappings_update: `
  {
    "mappings" : {
        "properties" : {
          "@timestamp" : {
            "type" : "date"
          },
          "@version" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "agent" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "auth" : {
            "type" : "keyword"
            
          },
          "bytes" : {
            "type" : "long"
          },
          "clientip" : {
            "enabled": false
          },
          "geoip" : {
            "properties" : {
              "city_name" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "continent_code" : {
                "type" : "keyword"
              },
              "country_code2" : {
                "type" : "keyword"
              },
              "country_code3" : {
                "type" : "keyword"
              },
              "country_name" : {
                "type" : "keyword"
              },
              "dma_code" : {
                "type" : "long"
              },
              "ip" : {
                "type" : "ip"
              },
              "latitude" : {
                "type" : "half_float"
              },
              "location" : {
                "type":"geo_point"
              },
              "longitude" : {
                "type" : "half_float"
              },
              "postal_code" : {
                "type" : "keyword"
              
              },
              "region_code" : {
               "type" : "keyword"
              },
              "region_name" : {
                "type" : "keyword"
              },
              "timezone" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              }
            }
          },
          "host" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "httpversion" : {
            "type" : "keyword"
          },
          "ident" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "logdate" : {
            "type" : "date"
          },
          "message" : {
            "type" : "text"
          },
          "path" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "port" : {
            "type" : "long"
          },
          "rawrequest" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "referrer" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "request" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "response" : {
            "type" : "keyword"
          },
          "tags" : {
            "enabled":false
          },
          "timestamp" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "type" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "useragent" : {
            "properties" : {
              "device" : {
                "type" : "keyword"
              },
              "major" : {
                "type" : "keyword"
              },
              "minor" : {
               "type" : "keyword"
              },
              "name" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "os" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "os_full" : {
                "type" : "keyword"
              },
              "os_major" : {
                "type" : "keyword"
              },
              "os_name" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "os_version" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "patch" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "version" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              }
            }
          },
          "verb" : {
            "type" : "keyword"
          }
        }
      }
  }`,
  reindex: `
POST _reindex
{
    "source": {
      "index": "nginx-2023.10.25",
    }

    "dest": {
      "index": "nginxlogs",
    },
}

`,
  index_template: `PUT \_index_template/nginxlogs
{
    "index_patterns": ["nginx*"],
    "priority": 10,
    "template": {
      "mappings": {
        ["설정된 내용을 여기에 넣는다"]
      }
    }
}`,

  reindex_template: `
  POST \_reindex
  {
      "source": {
        "index": "nginx-2023.10.25",
      }
      "dest": {
        "index": "nginxlogs( index template임)",
      }
  }`,
  painless: `POST _reindex
{
    "source": {
      "index": "nginx-*",
    }
    "dest": {
      "index": "nginxlogs( index template임)",
      "pipeline":"nginxlogs_delete_fields()"
    }
    "script": {
      "lang": "painless",
      "source": "ctx._index = 'nginxlogs-'+(ctx._index.substring('nginxlog-'.length(),ctx._index.length()))"
    }
}`,
  pipeline: `PUT _ingest/pipeline/nginxlogs_delete_fields
{
  "processors": [
    {
      "remove": {
        "fields": ["clientip", "ecs", "input", "tags"],
      }
    }
  ]
}`,
};
