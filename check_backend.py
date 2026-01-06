import requests
import sys

def check_endpoint(url):
    print(f"Attempting to connect to: {url}")
    try:
        response = requests.get(url, timeout=5)
        print(f"Status Code: {response.status_code}")
        try:
            print(f"Response JSON: {response.json()}")
        except requests.exceptions.JSONDecodeError:
            print(f"Response Text (not JSON): {response.text}")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Is the backend running?")
    except requests.exceptions.Timeout:
        print("Error: Request timed out. The server might be slow or unresponsive.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    print("-" * 30)

if __name__ == "__main__":
    print("--- Checking Backend Endpoints ---")
    check_endpoint("http://127.0.0.1:8000/")
    check_endpoint("http://127.0.0.1:8000/health")
    print("--- Check Complete ---")
