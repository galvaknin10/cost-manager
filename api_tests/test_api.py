# import unittest
# import requests

# # Base URL for the API endpoints
# BASE_URL = "https://cost-manager-api-58x9.onrender.com/api"

# class TestCostManagerAPI(unittest.TestCase):

#     def test_add_cost(self):
#         """Test adding a new cost item"""
#         # Define the payload with required fields
#         payload = {
#             "description": "Test Item",
#             "category": "food",
#             "userid": "123123",
#             "sum": 25
#         }

#         # Send a POST request to add a new cost item
#         response = requests.post(f"{BASE_URL}/add", json=payload)

#         # Verify that the response status code is 201 (Created)
#         self.assertEqual(response.status_code, 201)

#         # Parse the JSON response
#         data = response.json()

#         # Validate that the returned data matches the input payload
#         self.assertEqual(data["description"], "Test Item")
#         self.assertEqual(data["category"], "food")
#         self.assertEqual(data["userid"], "123123")
#         self.assertEqual(data["sum"], 25)

#     def test_get_report(self):
#         """Test retrieving a monthly report for a specific user"""
#         # Send a GET request to fetch the report
#         response = requests.get(f"{BASE_URL}/report?id=123123&year=2025&month=2")

#         # Verify that the response status code is 200 (OK)
#         self.assertEqual(response.status_code, 200)

#         # Parse the JSON response
#         data = response.json()

#         # Check if the response contains the "costs" field
#         self.assertIn("costs", data)

#     def test_get_user_details(self):
#         """Test retrieving details of a specific user"""
#         # Send a GET request to fetch user details
#         response = requests.get(f"{BASE_URL}/users/123123")

#         # Verify that the response status code is 200 (OK)
#         self.assertEqual(response.status_code, 200)

#         # Parse the JSON response
#         data = response.json()

#         # Validate that the returned data contains the expected fields
#         self.assertEqual(data["id"], "123123")
#         self.assertIn("first_name", data)
#         self.assertIn("last_name", data)

#     def test_get_about(self):
#         """Test retrieving team member details"""
#         # Send a GET request to fetch the team details
#         response = requests.get(f"{BASE_URL}/about")

#         # Verify that the response status code is 200 (OK)
#         self.assertEqual(response.status_code, 200)

#         # Parse the JSON response
#         data = response.json()

#         # Validate that the response contains a list of team members
#         self.assertIsInstance(data, list)
#         self.assertGreater(len(data), 0)  # Ensure the list is not empty

#         # Check that the first entry in the list has "first_name" and "last_name" fields
#         self.assertIn("first_name", data[0])
#         self.assertIn("last_name", data[0])

# # Run the tests when the script is executed
# if __name__ == "__main__":
#     unittest.main()

