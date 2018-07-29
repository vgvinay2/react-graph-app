import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
const options = {
  items: 4,
};

const BarGraph =(props) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  return(
    <Bar data= {data}/>
  )
}
const LineGraph =(props) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  return(
    <Line data={data} />
  );
}
const DoughnutGraph= (props) => {
  const data = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  return(
    <Doughnut data={data} />
  );

} 
const CLOUDINARY_UPLOAD_PRESET = 'iy8iecxj';
const CLOUDINARY_UPLOAD_URL =
 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';

class App extends Component {
 state = {
   selectedFile: [],
   uploadedImg: [],
 };
 handleChange = e => {
   this.setState({ selectedFile: Array.from(e.target.files) });
 };

 handleUpload = () => {

   this.state.selectedFile.forEach(file=>{
     var reader = new FileReader();
     reader.onload = (e) => {
       // Render thumbnail.
       this.setState({ uploadedImg: [...this.state.uploadedImg,
         {
           name: file.name,
           src: e.target.result
         }]});
     };
     reader.readAsDataURL(file)
   })

 };

 render() {
   return (
     <div className="App">
     <h2>Upload Files</h2>
       <input
         type="file"
         onChange={this.handleChange}
         accept="image/jpg,image/png"
         multiple
       />
       <button onClick={this.handleUpload}>Upload</button>
       <OwlCarousel className="owl-theme" loop margin={20} nav >
       {this.state.uploadedImg.map(image => (
        <div class="item">
           <img
             src={image.src}
             alt={image.name}
             style={{ height: '100px', width: '200px' }}
           />
          
         </div>
       ))}
       </OwlCarousel>
       <h2>Bar Graph</h2>
       <BarGraph/>
       <h2>Line Graph</h2>
       <LineGraph/>
       <h2>Doughnut Graph</h2>
       <DoughnutGraph/>
     </div>
   );
 }
}

export default App;
