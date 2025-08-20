#include <iostream>
using namespace std;

int main(){
    int arr[]={10,20,30,40,50};
    int *p1=&arr[0];
    int* p2=arr+3;
    
    cout<<p1-p2<<endl;// gives hte number of elements in between
    return 0;
}