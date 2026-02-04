import requests
import sys
import json
from datetime import datetime

class TeslaDiagnosticsAPITester:
    def __init__(self, base_url="https://car-vitals.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, expected_fields=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check expected fields if provided
                if expected_fields and isinstance(response_data, (dict, list)):
                    if isinstance(response_data, list) and len(response_data) > 0:
                        data_to_check = response_data[0]
                    else:
                        data_to_check = response_data
                    
                    for field in expected_fields:
                        if field in data_to_check:
                            print(f"   ✓ Field '{field}' present")
                        else:
                            print(f"   ⚠️  Field '{field}' missing")
                            success = False
                
                if isinstance(response_data, list):
                    print(f"   📊 Response: Array with {len(response_data)} items")
                elif isinstance(response_data, dict):
                    print(f"   📊 Response: Object with keys: {list(response_data.keys())}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.test_results.append({
                "name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_sample": str(response_data)[:200] if response_data else "No response"
            })

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200,
            expected_fields=["message", "version"]
        )

    def test_get_vehicles(self):
        """Test get all vehicles endpoint"""
        success, response = self.run_test(
            "Get All Vehicles",
            "GET",
            "vehicles",
            200,
            expected_fields=["id", "name", "model", "year", "vin", "color"]
        )
        return success, response

    def test_get_specific_vehicle(self, vehicle_id):
        """Test get specific vehicle endpoint"""
        return self.run_test(
            f"Get Vehicle {vehicle_id}",
            "GET",
            f"vehicles/{vehicle_id}",
            200,
            expected_fields=["id", "name", "model", "year", "vin", "color"]
        )

    def test_get_diagnostics(self, vehicle_id):
        """Test get diagnostics endpoint"""
        return self.run_test(
            f"Get Diagnostics for {vehicle_id}",
            "GET",
            f"diagnostics/{vehicle_id}",
            200,
            expected_fields=["vehicle_id", "timestamp", "battery", "motor", "tires", "gps", "speed", "range"]
        )

    def test_get_status(self, vehicle_id):
        """Test get status endpoint"""
        return self.run_test(
            f"Get Status for {vehicle_id}",
            "GET",
            f"status/{vehicle_id}",
            200,
            expected_fields=["vehicle_id", "overall_status", "systems", "timestamp"]
        )

    def test_invalid_vehicle(self):
        """Test with invalid vehicle ID"""
        return self.run_test(
            "Invalid Vehicle ID",
            "GET",
            "vehicles/invalid-id",
            404
        )

def main():
    print("🚗 Tesla Diagnostics API Testing")
    print("=" * 50)
    
    # Setup
    tester = TeslaDiagnosticsAPITester()
    
    # Test API root
    tester.test_root_endpoint()
    
    # Test vehicles endpoint
    vehicles_success, vehicles_data = tester.test_get_vehicles()
    
    if vehicles_success and vehicles_data:
        print(f"\n📋 Found {len(vehicles_data)} vehicles:")
        for vehicle in vehicles_data:
            print(f"   - {vehicle.get('name', 'Unknown')} ({vehicle.get('id', 'No ID')})")
        
        # Test each vehicle's endpoints
        for vehicle in vehicles_data:
            vehicle_id = vehicle.get('id')
            if vehicle_id:
                # Test specific vehicle endpoint
                tester.test_get_specific_vehicle(vehicle_id)
                
                # Test diagnostics endpoint
                tester.test_get_diagnostics(vehicle_id)
                
                # Test status endpoint
                tester.test_get_status(vehicle_id)
    
    # Test error handling
    tester.test_invalid_vehicle()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100
            },
            "detailed_results": tester.test_results
        }, f, indent=2)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())