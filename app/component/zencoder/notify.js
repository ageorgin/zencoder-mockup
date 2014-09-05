/**
 * Created by ageorgin on 04/09/14.
 */

// Constructor
function ZencoderNotify(jobId, jobStatus, submittedAt, outputId, outputUrl, outputStatus) {
    /*this.id = id;
    this.label = label;
    this.url = url;*/

    this.job = {
        "id": jobId,
        "state": jobStatus,
        "created_at": submittedAt,
        "updated_at": submittedAt,
        "submitted_at": submittedAt,
        "pass_through": null,
        "test": false
    };

    this.input = {
        "id": 112835787,
        "format": "asf",
        "frame_rate": 25,
        "duration_in_ms": 423815,
        "audio_sample_rate": 48000,
        "audio_bitrate_in_kbps": 128,
        "audio_codec": "wmav2",
        "height": 432,
        "width": 768,
        "file_size_in_bytes": 86023687,
        "video_codec": "wmv3",
        "total_bitrate_in_kbps": 1628,
        "channels": "2",
        "video_bitrate_in_kbps": 1500,
        "state": "finished",
        "md5_checksum": null
    };

    this.output = {
        "id": outputId,
        "url": outputUrl,
        "label": null,
        "state": outputStatus,
        "format": "mpeg4",
        "frame_rate": 25,
        "duration_in_ms": 423740,
        "audio_sample_rate": 44100,
        "audio_bitrate_in_kbps": 68,
        "audio_codec": "aac",
        "height": 288,
        "width": 512,
        "file_size_in_bytes": 31730487,
        "video_codec": "h264",
        "total_bitrate_in_kbps": 566,
        "channels": "2",
        "video_bitrate_in_kbps": 498,
        "md5_checksum": null
    };
}

module.exports = ZencoderNotify;