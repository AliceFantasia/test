#include <iostream>
using namespace std;
  
int binarySearch(int array[], int lower, int upper, int input);
int binarySearch2(int arr[], int lower, int upper, int x);
int main()
{   
    
    int array[] = { 1, 45, 17, 27, 37, 100 };
    
    int input;
    cout << "###################################################################\n";
    cout << "#Program to demonstrate binary searching algorithm implementations#\n";
    cout << "###################################################################\n";
    cout << "Input number you want to search in array please \n";
    
    cin >> input;

    int n = sizeof(array) / sizeof(array[0]);
    
    int result = binarySearch(array, 0, n - 1, input);
    
    cout << "Using while loop to implement binary searching algorithm\n";
    
    if(result == -1) cout << "Element is not present in array";
    else
    cout << "Element is present at index \n" << result;
                   
    result = binarySearch2(array, 0, n - 1, input);
    
    cout << "\nUsing recursive to implement binary searching algorithm\n";
    
    if(result == -1) cout << "Element is not present in array";
    else
    cout << "Element is present at index \n" << result;
    return 0;
}

int binarySearch(int array[], int lower, int upper, int input)
{
    while (lower <= upper) {
        
        int middle = lower + (upper - lower) / 2;
        
        if (array[middle] == input) return middle;
        
        (array[middle] < input) ? lower = middle + 1 
        
        : upper = middle - 1;

    }

    return -1;
}

int binarySearch2(int arr[], int lower, int upper, int x)
{
    if (upper >= lower) {
        int middle = lower + (upper - lower) / 2;
  
        if (arr[middle] == x) return middle;
  
        return (arr[middle]>x) ? binarySearch(arr, lower, middle - 1, x)
        
        : binarySearch(arr, middle + 1, upper, x);
        
    }
  
    return -1;
}
  
