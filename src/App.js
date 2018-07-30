import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {generateId} from './utility';
import Slider from "react-slick";
import Modal from './Modal'

const it = generateId()

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
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
    <div style={{margin: '0 auto'}}>
    <Bar data= {data}/>
    </div>
    
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


class App extends Component {
 state = {
   selectedFile: [],
   uploadedImg: [],
   show: false,
   slideToIndex: null,
 };

 modalSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  adaptiveHeight: true,
  slickGoTo:this.state.slideToIndex
}


 handleChange = e => {
   this.setState({ selectedFile: Array.from(e.target.files) });
 };

 handleUpload = () => {

   this.state.selectedFile.forEach(file=>{
     var reader = new FileReader();
     reader.onload = (e) => {
       // Render thumbnail.
       this.setState(
        { uploadedImg: [...this.state.uploadedImg,
         {
           id: it.next().value,
           name: file.name,
           src: e.target.result
         }],
         selectedFile: []
        });
     };
     reader.readAsDataURL(file)
   })

 };

 showModal = (e) => {
   e.stopPropagation()
  this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

 renderCarousel = (style) => {
  return this.state.uploadedImg.map((image,index) => {
    return (
     <div className="item"  key={image.id} onClick={(e) => this.showModal(e)} >
        <img
          src={image.src}
          alt={image.name}
          style={style}
        />
      </div> 
    )
  })
 }



 componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

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
       <Modal show={this.state.show} handleClose={this.hideModal} >
       <Slider  asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} {...this.modalSettings} onClick={()=>{console.log("Hi")}}>
        
          {this.renderCarousel({ height: '70vh', width: '70vw' })}
          
       </Slider>
       </Modal>
       {this.renderCarousel().length ? 
        <div style={{margin: '0 auto', maxWidth: '700px'}}>
        <Slider  asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)} {...settings} onClick={()=>{console.log("Hi")}}>
         {this.renderCarousel({ height: '100px', width: '200px' })}
       </Slider>
        </div>
         : null
      }
       
      
       <div className="BarGraph" >
        <h2>Bar Graph</h2>
       <BarGraph/></div>
       <div className="DoughnutGraph" >
       <h2>Doughnut Graph</h2>
       <DoughnutGraph/></div>
       
       <div className="LineGraph" >
       <h2>Line Graph</h2>
       <LineGraph/></div>
       
       
     </div>
   );
 }
}

export default App;


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={(e)=>{
        e.stopPropagation()
        onClick()
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={(e)=>{
        e.stopPropagation(); 
        onClick()
      }}
    />
  );
}



