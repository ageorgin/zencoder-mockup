/**
 * Created by ageorgin on 09/07/14.
 */

// Package inclusion
var mongoose = require('mongoose');

// Init vars
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    input: String,
    region: String,
    status: {type: String, default: 'PROCESS'},
    submitted_at: {type: Date, default: Date.now},
    output: [
        {
            url: String,
            base_url: String,
            filename: String,
            format: String,
            video_codec: String,
            audio_codec: String,
            size: String,
            quality: Number,
            video_bitrate: Number,
            audio_quality: Number,
            audio_bitrate: Number,
            max_video_bitrate: Number,
            speed: Number,
            decoder_bitrate_cap: Number,
            frame_rate: Number,
            keyframe_interval: Number,
            fixed_keyframe_interval: Boolean,
            forced_keyframe_interval: Number,
            audio_sample_rate: Number,
            audio_channels: Number,
            deblock: Boolean,
            h264_reference_frames: Number,
            h264_profile: String,
            h264_level: Number,
            hint: Boolean,
            max_aac_profile: String,
            force_aac_profile: String,
            notifications:[
                {
                    url: String,
                    format: String,
                    event: String
                }],
            status: {type: String, default: 'PROCESS'}
        }]
});

module.exports = mongoose.model('Job', JobSchema);