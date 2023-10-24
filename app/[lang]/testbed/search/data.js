export const elasticscript = {
  mappings_update: `PUT nginxlog
{
    "mappings": {
      "properties": {}
    },
}`,
  reindex: `
POST _reindex
{
    "source": {
      "index": "nginxlog-2023.10.23",
    }

    "dest": {
      "index": "nginxlog",
    },
  }

`,
  index_template: `PUT \_index_template/nginxlogs
{
    "index_patterns": ["nginxlog*"],
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
        "index": "nginxlog-2023.10.23",
      }
      "dest": {
        "index": "nginxlogs( index template임)",
      }
  }`,
  painless: `POST _reindex
{
    "source": {
      "index": "nginxlog-*",
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
