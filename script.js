let y = document.getElementById("ArrayInput")
let error = document.getElementById("Improper")
error.style.visibility = 'hidden'
let arr;
let max;
let prog = false;
function getArray(){
    if(prog) return;
    error.style.visibility = 'hidden'
    let array = y.value.split(',');
    max = parseInt(array[0]);
    for(let i = 0;i < array.length;i++){
        array[i] = parseInt(array[i]);
        if(array[i] < 1 || array[i] > 20){
            error.style.visibility = 'visible';
            return;
        }
        if(max < array[i]){
            max = array[i];
        }
    }
    arr = array;
    renderarray(array);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function renderarray(array, x = -1,y = -1, z = -1){
    let display = document.getElementById("render");
    display.innerHTML = "";
    for(let i = 0;i < array.length;i++){
        const ele = document.createElement("div");
        ele.style.height = array[i]*50 + 'px';
        ele.style.width = 400/array.length +'px';
        ele.style.top = display.top;
        ele.style.left = 400/array.length * i + 50 + 'px';
        if(i == x || i == y || i == z){
            ele.style.backgroundColor = 'orange';
        }
        else{
            ele.style.backgroundColor = 'aqua';
        }
        ele.classList.add("element");
        display.appendChild(ele);
    }
}

async function bubblesort(){
    if(prog) return;
    prog = true
    let n = arr.length;
    console.log(arr.length)
    for(let i = 0;i < n;i++){
        for(let j = 0;j < n-i-1;j++){
            if(arr[j] > arr[j+1]){
                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
                await sleep(200);
                renderarray(arr, i, j);
            }
        }
    }
    renderarray(arr, -1, -1)
    prog = false
}

async function selectionsort(){
    if(prog) return;
    prog = true
    let n = arr.length;
    for(let i = 0;i < n;i++){
        let mi = i;
        for(let j = i+1;j < n;j++){
            if(arr[j] < arr[mi]){
                mi = j;
            }
            await sleep(200);
            renderarray(arr, i, mi);
        }
        let tmp = arr[i];
        arr[i] = arr[mi];
        arr[mi] = tmp;
    }
    renderarray(arr, -1, -1)
    prog = false
}

async function merge(arr, left, mid, right){
    const n1 = mid-left+1;
    const n2 = right-mid;
    let L = new Array(n1);
    let R = new Array(n2);
    for(let i = 0;i < n1;i++){
        L[i] = arr[left+i];
    }
    for(let i = 0;i < n2;i++){
        R[i] = arr[mid+1+i];
    }
    let i = 0, j = 0;
    let k = left;
    while(i < n1 && j < n2){
        if(L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while(i < n1){
        arr[k] = L[i];
        i++;
        k++;
    }
    while(j < n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}

async function mergesort(left, right){
    if(left >= right)
        return;
    let mid = Math.floor((left+right)/2);
    await mergesort(left, mid);
    await mergesort(mid+1, right);
    await merge(arr, left, mid, right);
    await sleep(200);
    await renderarray(arr, left, right);
}

async function msort(){
    if(prog) return
    prog = true
    await mergesort(0, arr.length - 1)
    renderarray(arr, -1, -1)
    prog = false
}

async function partition(ar, start, end){
    const pivotValue = ar[end];
    let pivotIndex = start - 1; 
    for (let i = start; i < end; i++) {
        if (ar[i] <= pivotValue) {
            pivotIndex++;
            let tmp = ar[i]
            ar[i] = ar[pivotIndex]
            ar[pivotIndex] = tmp 
        }
    }    
    let tmp = ar[end]
    ar[end] = ar[pivotIndex + 1]
    ar[pivotIndex + 1] = tmp
    await sleep(200)   
    renderarray(ar, start, end)
    return pivotIndex + 1;
};
  
async function quickSort(ar, low, high) { 
    if (low >= high) return; 
    let pi = await partition(ar, low, high)
    await quickSort(ar, low, pi - 1)
    await quickSort(ar, pi + 1, high)
} 

async function qsort(){
    if(prog) return;
    prog = true
    await quickSort(arr, 0, arr.length - 1)
    renderarray(arr, -1, -1)
    prog = false
}

async function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1; 
    let r = 2 * i + 2; 
    if (l < n && arr[l] > arr[largest]) {
        largest = l;
    }
    if (r < n && arr[r] > arr[largest]) {
        largest = r;
    }
    await sleep(200)
    renderarray(arr,i,l,r)
    if (largest != i) {
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        await heapify(n, largest);
    }
}
async function heapSort() {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        await heapify(i, 0);
    }
}
async function hsort(){
    if(prog) return
    prog = true
    await heapSort()
    renderarray(arr, -1, -1)
    prog = false
}