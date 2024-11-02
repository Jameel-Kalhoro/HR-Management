from collections import Counter


def assign_hours(schedule_data, hour_list):
    num_hours = len(schedule_data)  # Total number of hours (168 in this case)
    hour_list_len = len(hour_list)  # Length of the input hour list

    for i in range(num_hours):
        schedule_data[i][0] = hour_list[i % hour_list_len]  # Assign hour cyclically

    return schedule_data

def assign_requirements(schedule_data, req_list):
    # Flatten the req_list into a single list of requirements
    flat_req_list = [item for sublist in req_list for item in sublist]

    # Update schedule_data with the requirements
    for i in range(len(flat_req_list)):
        schedule_data[i][1] = flat_req_list[i]

    return schedule_data

def assign_agents_with_breaks(schedule_data, num_ftw, num_ptw, max_ftw, min_ftw, max_ptw, min_ptw, ftw_workload_hours, ptw_workload_hours):
    ftw_idx = 0  # Index to track FTW
    ptw_idx = 0  # Index to track PTW

    # Keep track of the last hour each agent was scheduled and their total workload
    ftw_last_assigned = [-9] * num_ftw  # Initially set to -9 (so they are available from hour 0)
    ptw_last_assigned = [-9] * num_ptw
    ftw_workload = [0] * num_ftw  # Track FTW workload to limit it to 40 hours
    ptw_workload = [0] * num_ptw  # Track FTW workload to limit it to 20 hours

    for i in range(len(schedule_data)):  # Loop through each hour
        req = schedule_data[i][1]  # Requirement for the current hour
        scheduled = schedule_data[i][2]  # Currently scheduled agents
        available_spots = req - scheduled  # Spots that need to be filled

        # If there are still agents needed for this hour
        if available_spots > 0:
            # Try assigning FTWs, prioritizing longer blocks between min_ftw and max_ftw
            for ftw_idx in range(num_ftw):
                if ftw_workload[ftw_idx] < ftw_workload_hours and i - ftw_last_assigned[ftw_idx] >= 8:  # 8-hour break and workload limit check
                    for ftw_hours in range(max_ftw, min_ftw - 1, -1):  # Try from max_ftw to min_ftw
                        if ftw_workload[ftw_idx] + ftw_hours <= ftw_workload_hours:  # Check if FTW will exceed workload limit
                            can_assign_ftw = all(
                                schedule_data[j][1] > schedule_data[j][2] for j in range(i, min(i + ftw_hours, len(schedule_data)))
                            )
                            if can_assign_ftw:
                                for j in range(i, i + ftw_hours):
                                    if j < len(schedule_data):  # Ensure we're within bounds
                                        schedule_data[j][2] += 1  # Increment scheduled agents
                                        if schedule_data[j][3] == '':
                                            schedule_data[j][3] = f"FTW {ftw_idx}"
                                        else:
                                            schedule_data[j][3] += f", FTW {ftw_idx}"
                                ftw_last_assigned[ftw_idx] = i + ftw_hours  # Mark last assigned time
                                ftw_workload[ftw_idx] += ftw_hours  # Increment FTW workload
                                available_spots -= ftw_hours
                                break  # Move on to the next hour after assigning an FTW

            # Try assigning PTWs, prioritizing longer blocks between min_ptw and max_ptw
            for ptw_idx in range(num_ptw):
                if ptw_workload[ptw_idx] < ptw_workload_hours and i - ptw_last_assigned[ptw_idx] >= 8:  # Check if 8-hour break is respected
                    for ptw_hours in range(max_ptw, min_ptw - 1, -1):  # Try from max_ptw to min_ptw
                        if ptw_workload[ptw_idx] + ptw_hours <= ptw_workload_hours:
                          can_assign_ptw = all(
                              schedule_data[j][1] > schedule_data[j][2] for j in range(i, min(i + ptw_hours, len(schedule_data)))
                          )
                          if can_assign_ptw:
                              for j in range(i, i + ptw_hours):
                                  if j < len(schedule_data):  # Ensure we're within bounds
                                      schedule_data[j][2] += 1  # Increment scheduled agents
                                      if schedule_data[j][3] == '':
                                          schedule_data[j][3] = f"PTW {ptw_idx}"
                                      else:
                                          schedule_data[j][3] += f", PTW {ptw_idx}"
                              ptw_last_assigned[ptw_idx] = i + ptw_hours  # Mark when the PTW was last assigned
                              ptw_workload[ptw_idx] += ptw_hours
                              available_spots -= ptw_hours
                              break  # Move on to the next hour after assigning a PTW

    return schedule_data



def calculateWorkLoad(schedule_data):
    # Initialize a dictionary to store the total hours for each agent
    workers_cloumn = []

    for row in schedule_data:
      workers = row[3]
      workers_cloumn.extend(worker.strip() for worker in workers.split(','))


    workload = Counter(workers_cloumn)
    return dict(workload)



# input hour requirements
req_list = [[1, 1, 1, 3, 10, 22, 22, 21, 17, 16, 14, 11, 16, 10, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 5, 14, 11, 11, 9, 8, 8, 7, 8, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 10, 22, 22, 21, 17, 16, 14, 11, 16, 10, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 5, 14, 11, 11, 9, 8, 8, 7, 8, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 10, 22, 22, 21, 17, 16, 14, 11, 16, 10, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 5, 14, 11, 11, 9, 8, 8, 7, 8, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
             ]



# Create a 2D array with 168 rows, each row representing an hour in the week
schedule_data = [[0, 0, 0, ''] for _ in range(len(req_list) * 24)]


# Input hour list
hour_list = [0,1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]


# Call the function to assign hours
schedule_data = assign_hours(schedule_data, hour_list)

# Call the function to assign requirements
schedule_data = assign_requirements(schedule_data, req_list)

# Set number of FTWs and PTWs
num_ftw = 15
num_ptw = 10
max_ftw = 12
min_ftw = 6
max_ptw = 6
min_ptw = 4
ftw_workload_hours = 40
ptw_workload_hours = 20

schedule_data = assign_agents_with_breaks(schedule_data, num_ftw, num_ptw, max_ftw, min_ftw, max_ptw, min_ptw, ftw_workload_hours, ptw_workload_hours)

chunk_size = 24
schedule_list = [
    {str(item[0]): item[3].split(", ") for item in schedule_data[i:i+chunk_size]}
    for i in range(0, len(schedule_data), chunk_size)
]

workload = calculateWorkLoad(schedule_data)

print("this is schedule_list:")
print(schedule_list)
print("this is workload:")
print(workload)

print("Hour   req   schedule    agents")
# Loop through the days and hours

for day in range(len(req_list)):  # days
    print(f"\nDay {day}")  # Print the day header
    for hour in range(24):  # 24 hours
        row_index = day * 24 + hour  # Calculate the row index
        row = schedule_data[row_index]  # Get the corresponding row from schedule_data
        print(f"{row[0]:<6} {row[1]:<6} {row[2]:<12} {row[3]}")  # Print formatted output