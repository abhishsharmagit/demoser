const areasModel = require("../model/area");
const logger = require('../utils/logger').getLogger("controller/area.js");

const squareArea = async function (req, res) {
   try{
       let{
           side, shape
       } = req.body;
       var shapes = shape.toLowerCase();
       var area = side*side;
            const calcArea = await areasModel.areaSquare(area, shapes);
            return res.json({
                success: true,
                calcArea: calcArea
            })
           
        }
    catch (error) {
        logger.error(error, "error in calculate area")
        return res.json({
            success: false,
            message: error
        })
    }

    
}

const rectArea = async function (req, res) {
    try{
        let{
            length, breadth, shape
        } = req.body;
        var shapes = shape.toLowerCase();
        var area = 2*length*breadth;
             const calcArea = await areasModel.areaRect(area, shapes);
             return res.json({
                 success: true,
                 calcArea: calcArea
             })
            
         }
     catch (error) {
        logger.error(error, "error in calculate area")
         return res.json({
             success: false,
             message: error
         })
     }
 
     
 }

 const circleArea = async function (req, res) {
    try{
        let{
            radius, shape
        } = req.body;
        var shapes = shape.toLowerCase();
        var area = 3.14*radius*radius;
             const calcArea = await areasModel.areaCircle(area, shapes);
           
             return res.json({
                 success: true,
                 calcArea: calcArea
             })
            
         }
     catch (error) {
        logger.error(error, "error in calculate area")
         return res.json({
             success: false,
             message: error
         })
     }
 
     
 }

 const triArea = async function (req, res) {
    try{
        let{
            b, h, shape
        } = req.body;
        var shapes = shape.toLowerCase();
        var area = 0.5*b*h;
             const calcArea = await areasModel.areaTri(area, shapes);
           
             return res.json({
                 success: true,
                 calcArea: calcArea
             })
            
         }
     catch (error) {
        logger.error(error, "error in calculate area")
         return res.json({
             success: false,
             message: error
         })
     }
 
     
 }

 const getArea = async function (req, res) {
    try{
        let{
            skip, limit
        } = req.query;
        skip = parseInt(skip);
        limit = parseInt(limit);
             const calcArea = await areasModel.getArea(skip, limit);
           
             return res.json({
                 success: true,
                 calcArea: calcArea
             })
            
         }
     catch (error) {
        logger.error(error, "error in calculate area")
         return res.json({
             success: false,
             message: error
         })
     }
 
     
 }

 const getsqArea = async function (req, res) {
    try{
        let{
            side, shape
        } = req.query;
        var shapes = shape.toLowerCase();
       var area = side*side;
             const calcArea = await areasModel.areaSquare(area, shape);
          
             return res.json({
                 success: true,
                 calcArea: area,
                 shape: shapes
             })
            
         }
     catch (error) {
        logger.error(error, "error in calculate area")
         return res.json({
             success: false,
             message: error
         })
     }
 
     
 }

 const getrectArea = async function (req, res) {
    try{
        let{
            length, breadth, shape
        } = req.query;
        var shapes = shape.toLowerCase();
        var area = 2*length*breadth
             const calcArea = await areasModel.areaRect(area, shapes);
             
             return res.json({
                 success: true,
                 calcArea: area,
                 shape: shapes
             })
            
         }
     catch (error) {
        logger.error(error, "error in calculate area")
         return res.json({
             success: false,
             message: error
         })
     }
 
    }

    const getcirArea = async function (req, res) {
        try{
            let{
                radius, shape
            } = req.query;
            var shapes = shape.toLowerCase();
            var area = 3.14*radius*radius;
     
                 const calcArea = await areasModel.areaCircle(area, shapes);
                 console.log("there")
                 return res.json({
                     success: true,
                     calcArea: area,
                     shape: shapes
                 })
                
             }
         catch (error) {
            logger.error(error, "error in calculate area")
             return res.json({
                 success: false,
                 message: error
             })
         }
     
         
     }

     const gettriArea = async function (req, res) {
        try{
            let{
                b, h, shape
            } = req.query;
            var shapes = shape.toLowerCase();
            b = parseInt(b);
            h = parseInt(h)
            var area = b*h;
                 const calcArea = await areasModel.areaTri(area, shapes);
                 
                 return res.json({
                     success: true,
                     calcArea: area,
                     shape: shapes
                 })
                
             }
         catch (error) {
            logger.error(error, "error in calculate area")
             return res.json({
                 success: false,
                 message: error
             })
         }
     
         
     }


     

module.exports = {squareArea, rectArea, circleArea, triArea, getArea, getsqArea, getrectArea, getcirArea, gettriArea};