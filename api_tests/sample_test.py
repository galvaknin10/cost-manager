# import sys
# import requests

# filename = input("filename=")

# line = "https://cost-manager-api-58x9.onrender.com"

# output = open(filename, "w")

# sys.stdout = output

# print(line)
# print("\n")

# print("testing getting the about")
# print("-------------------------")

# try:
#     text = ""
#     url = line + "/api/about/"
#     data = requests.get(url)

#     print(data.json())

# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")

# # -------------------------------------
# # Testing GET /api/report - 1
# # -------------------------------------
# print("testing getting the report - 1")
# print("------------------------------")

# try:
#     text = ""
#     url = line + "/api/report/?id=123123&year=2025&month=2"
#     data = requests.get(url)

#     print(data.json())

    

# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")

# # -------------------------------------
# # Testing POST /api/add (Milk 9)
# # -------------------------------------
# print("testing adding cost item")
# print("----------------------------------")

# try:
#     text = ""
#     url = line + "/api/add/"
#     data = requests.post(url, json={"userid": 123123, "description": "milk 9", "category": "food", "sum": 8})

#     print(data.json())

# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")

# # -------------------------------------
# # Testing GET /api/report - 2 (After Adding Cost)
# # -------------------------------------
# print("testing getting the report - 2")
# print("------------------------------")

# try:
#     text = ""
#     url = line + "/api/report/?id=123123&year=2025&month=2"
#     data = requests.get(url)

#     print(data.json())


# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")

# # -------------------------------------
# # Testing POST /api/add (Milk 17)
# # -------------------------------------
# print("testing adding cost item")
# print("----------------------------------")

# try:
#     text = ""
#     url = line + "/api/add/"
#     data = requests.post(url, json={"userid": 123123, "description": "milk 17", "category": "food", "sum": 8})

#     print(data.json())

# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")

# # -------------------------------------
# # Testing GET /api/report - 3 (After Another Cost Update)
# # -------------------------------------
# print("testing getting the report - 3")
# print("------------------------------")

# try:
#     text = ""
#     url = line + "/api/report/?id=123123&year=2025&month=2"
#     data = requests.get(url)

#     print(data.json())

# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")

# # -------------------------------------
# # Testing GET /api/users/123123
# # -------------------------------------
# print("Testing GET /api/users/123123")
# print("------------------------------")

# try:
#     url = line + "/api/users/123123"
#     date = requests.get(url)

#     print(date.json())

# except Exception as e:
#     print("Problem:", e)

# print("\n")

# # -------------------------------------
# # Testing GET /api/report - 4 (Checking Computed Design Pattern)
# # -------------------------------------
# print("testing getting the report - 4")
# print("------------------------------")

# try:
#     text = ""
#     url = line + "/api/report/?id=123123&year=2025&month=3"
#     data = requests.get(url)

#     print(data.json())



# except Exception as e:
#     print("problem")
#     print(e)

# print("\n")
