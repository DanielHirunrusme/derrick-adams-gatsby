ffmpeg -i .\main_trim_2_lores.mp4 -r 30 -vb 20M scale=1200:-1 frames/%d.jpg


ffmpeg -i .\main_trim_2_lores.mp4 -r 30 -vf scale=1280:720 frames/%d.jpg

ffmpeg -i .\main_2.mp4 -vf scale=1280:720 frames/%d.jpg

ffmpeg -i .\vr_1_lores.mp4 -vf scale=1280:720 vr_1/%d.jpg

# hi resolution
ffmpeg -i .\vr_1_lores.mp4 -vf scale=1600:900 -qscale:v 2 vr_1/%d.jpg