#!/usr/bin/env python3
import os
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREENS_DIR = os.path.join(BASE_DIR, "screens")

screen_files = [
    "P01_splash_language.png",
    "P02_registration.png",
    "P03_otp_verification.png",
    "P04_login.png",
    "P05_home_destination_search.png",
    "P06_route_results.png",
    "P07_buses_behind_me.png",
    "P08_bus_detail.png",
    "P09_route_crowd_level.png",
    "P10_checker_counts.png",
    "P11_submit_complaint.png",
    "P12_my_complaints_tracking.png",
    "P13_notifications_alerts.png",
    "P14_profile_settings.png",
    "C01_checker_login.png",
    "C02_checker_home_dashboard.png",
    "C03_select_bus_id.png",
    "C04_enter_passenger_counts.png",
    "C05_entry_submitted_success.png",
    "C06_entry_rejected_geofence_error.png",
    "C07_entry_history.png",
    "C08_correct_or_void_entry.png",
    "C09_offline_queue_sync.png",
    "C10_checker_profile_settings.png"
]

upload_urls = [
    "https://mcp.figma.com/mcp/upload/106bdb9f-bd0a-485e-a9ad-b2fb837b66d7/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/a17479c5-1d4a-4c6f-b2f8-cba9188c84fe/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/44e4b064-3e87-4d38-a010-c279dc15bc61/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/1ab14fb6-144f-449e-86f2-4e29962c793e/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/3dfa9ffe-9724-40fe-807f-0a6d191acd24/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/88c8b4e4-1fd6-44a5-bd3c-461631277d5c/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/5c5536cc-6011-449b-825a-020600e45e20/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/efd1f7de-02c6-4134-8bad-499acd8bc6b9/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/0d5f0e19-3b84-46b6-8439-9849e35012a6/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/73dbd889-fa9b-4723-bfea-1c0dd3db9267/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/444c74f9-dddc-48e9-9ef6-5b8d5d63c2f0/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/961225fd-6cf0-4713-9360-81a93136d3ef/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/a7f82eeb-0b99-4e64-880e-84e53dde7a52/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/304303e6-c41e-4f29-84a0-4874d2b20d42/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/dd4f3d4d-49d1-4c5e-bde5-809dcf875c08/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/86bbf7e0-df1c-48bd-b96c-66354bb5f26f/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/d8543bea-06aa-4a6c-8f2b-80dff565c03a/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/ae736bd3-b71c-461e-b9fb-5d4dbd50ccd8/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/a817164c-cde3-4d60-b5e3-cbb9e89f226c/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/e4af3a9f-bd2d-4227-8f17-664547f9a3cb/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/ecc0cef8-c212-4ad7-a2a1-7f5b38b98d72/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/12dc32a1-6eeb-4cff-b54d-9e7979c7c622/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/3177120f-bf04-4cb7-b434-5e2ff2c93450/submit?scaleMode=FILL",
    "https://mcp.figma.com/mcp/upload/7ba50ba0-bd5a-42e7-bd9f-870703826089/submit?scaleMode=FILL"
]

def upload_screen(filename, submit_url):
    file_path = os.path.join(SCREENS_DIR, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
        
    cmd = [
        "curl", "-s", "-w", "\n%{http_code}",
        "-X", "POST",
        "-F", f"file=@{file_path};type=image/png",
        submit_url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    out_lines = res.stdout.strip().split("\n")
    http_code = out_lines[-1] if out_lines else ""
    if http_code in ["200", "201"]:
        print(f"✓ Uploaded {filename} -> Status {http_code}")
        return True
    else:
        print(f"✗ Failed {filename} -> Status {http_code}: {res.stdout}")
        return False

if __name__ == "__main__":
    success = 0
    for fname, url in zip(screen_files, upload_urls):
        if upload_screen(fname, url):
            success += 1
    print(f"\nUploaded {success}/{len(screen_files)} screens successfully.")
