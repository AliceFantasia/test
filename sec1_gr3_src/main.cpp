#include<iostream>
using namespace std;

int insertionsort(int *arr, int size);//prototype for insertionsort function
void display(int *arr, int size);//prototype for display/printing function

int main ()
{
    
    const int MAX=100;
    int array[MAX];
    int size;
    
    cout<<("please enter array size\n");
    
    cin >> size; //recieve array size
    if (size > MAX){
       cerr << "Array size is too big";
    }
    
    int arr[size]; //initiate array
    
    cout<<("please enter element(s) of the array\n");
    for (int i = 0; i < size; ++i) { // recieve array input
        cin >> arr[i];
    }
   
    cout<<"\nbefore sorting \n";
  
    insertionsort(arr, size); //call sorting function
   
    cout<<"\nafter sorting \n";
    
    display(arr, size); //call printing function
}

void display(int *arr, int size){
    for(int i=0;i<size;i++)
       {
       cout <<arr[i]<<"\t";
       }
}

int insertionsort(int *arr, int size){ //insertion sorting algorithm function
     
   int i=0;
   while(i<size)
   {
      cout <<arr[i]<<"\t";
      i++;
   }
   int k=1;
   while(k<size)
   {
      int temp = arr[k];
      int j= k-1;
      while(j>=0 && temp <= arr[j])
      {
         arr[j+1] = arr[j];
         j = j-1;
      }
      k++;
      
   arr[j+1] = temp;
   }
   
   return *arr;
   
}
