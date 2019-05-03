// Define a new component called button-counter
var slider = Vue.component('slider', {
    data: function () {
      return {
        rangeSlider: 1,
        sliderData: [80, 120, 60, 150, 200],
        }
    },
    methods: {
        runD3: function () {
            var w = 500;
            var h = 200;
            var bar = d3.select('svg')
                    .selectAll('rect')
                    .data(this.sliderData)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return i * 21;
                    })
                    .attr("y", function(d) {
                        return h - d;  
                    })
                    .attr("width", 20)
                    .attr("height", function(d) {
                        return d; 
                    })
                    .attr("fill", function(d) {
                        return "rgb(0, 0, " + (d * 2) + ")";
                    })
            },
        updateD3: function () {
            var w = 500;
            var h = 200;
            var bar = d3.select('svg')
                    .selectAll('rect')
                    .data(this.changeData)
                    .transition().delay(100).duration(1000) 
                    .attr("x", function(d, i) {
                        return i * 21;
                    })
                    .attr("y", function(d) {
                        return h - d;  
                    })
                    .attr("width", 20)
                    .attr("height", function(d) {
                        return d; 
                    })
                    .attr("fill", function(d) {
                        return "rgb(0, 0, " + (d * 3) + ")";
                    })
        }
    },
    watch: { 
        changeData: function () {
            this.updateD3();
         }
    },
    computed: {
        changeData: function () {
            return this.sliderData.map(value => value * (this.rangeSlider/3))
        }
    },
    mounted: function () {
        this.runD3();
    },
    template: `
    <div class="slider-wrapper">
        <svg width='600' height='200'></svg>
        <div class="slide">
            <input v-model="rangeSlider" class="range" type="range" id="start" name="volume" min="1" max="4">
        </div>
    </div>`
  })

export default slider

