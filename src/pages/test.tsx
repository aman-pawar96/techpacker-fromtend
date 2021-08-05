import { useState } from 'react';
import {Grid,Box,IconButton} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'


export default function Test() {
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [displayData,setDisplayData]:any=useState({});
  const [data,setData]:any=useState([])
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    axios.get(`http://localhost:4000/test/getThumbNails?page=1`)
      .then(res=>{
        console.log(res.data.body)
        setTotalPages(res.data.body.size);
        setDisplayData(res.data.body.details[0]);
        setData(res.data.body.details);
        setLoading(false);
      });
      
  },[])

  const nextPage=()=>{
    const currentPage=page
    setPage(currentPage+1);
    fetchThumbNails(currentPage+1);
  }
  const prevPage=()=>{
    const currentPage=page
    setPage(currentPage-1);
    fetchThumbNails(currentPage-1);
  }
  
  const fetchThumbNails=(pageIndex:any)=>{
    axios.get(`http://localhost:4000/test/getThumbNails?page=${pageIndex}`)
      .then(res=>{
        setData(res.data.body.details);
      })

  }

  const imageClick=(thumbnail:any)=>{
    setDisplayData(thumbnail);  
  }

  return (
    <div style={{textAlign:'center'}}>
    {loading?
    (<CircularProgress/>):(
      <Grid spacing={2}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Grid container>
              <Grid item xs={8} sm={8} lg={8} md={8}> 
                <Box m={1} p={1} height={360}>
                  <img src={require(`../Images/large/${displayData.image}`).default} height={340}/>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4}> 
                <Box m={1} p={1} height={360}>
                  <div style={{textAlign:'left'}}>
                  <div>
                    <strong>ID: </strong>{displayData.id}
                  </div>
                  <div>
                    <strong>TITLE: </strong>{displayData.title}
                  </div>
                  <div>
                    <strong>COST: </strong>{displayData.cost}
                  </div>
                  <div>
                    <strong>IMAGE: </strong>{displayData.image}
                  </div>
                  <div>
                    <strong>THUMBNAIL: </strong>{displayData.thumbnail}
                  </div>
                  <div>
                    <strong>DESCRIPTION: </strong>{displayData.description}
                  </div>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Grid container>
              <Grid item xs={1} sm={1} lg={1} md={1}> 
                <Box m={1} height={80}>
                  <IconButton
                      disabled={page===1?true:false}
                      onClick={prevPage}
                  >
                    <NavigateBeforeIcon/>
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={10} sm={10} lg={10} md={10}>
                <Grid container>
                  {
                    data.map((thumbnail:any)=>{
                      return(
                        <Grid item xs={3} sm={3} lg={3} md={3}>
                          <div> 
                            <img src={require(`../Images/thumbnails/${thumbnail.thumbnail}`).default} height={80} onClick={()=>{imageClick(thumbnail)}} />
                          </div>
                          <div >
                            <Box m={1} p={1} bgcolor='#808080' borderRadius={10} >
                              <strong>{thumbnail.id}</strong>
                            </Box>
                          </div> 
                        </Grid>
                        
                      )
                    })
                  }
                </Grid>
              </Grid>
              <Grid item xs={1} sm={1} lg={1} md={1}> 
                <IconButton
                  disabled={page===totalPages?true:false}
                  onClick={nextPage}
                >
                  <NavigateNextIcon/>
                </IconButton>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )}
    </div>
  );
}
