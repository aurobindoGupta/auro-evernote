import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import {Divider, Button} from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null 
        };
    }
    render(){
        const { notes, classes, selectedNoteIndex } = this.props;
        

        if(notes){
            return(
                <div className={classes.sidebarContainer}>
                    <Button 
                    onClick={this.newNoteBtnClick}
                    className={classes.newNoteBtn}> {this.state.addingNote ? 'Cancel' : 'NEW NOTE'}</Button>
        
                    {
                        this.state.addingNote ? 
                        <div>
                            <input type='text'
                            className={classes.newNoteInput}
                            placeholder='Enter Note Title'
                            onKeyUp={(e) => this.updateTitle(e.target.value)}>
        
                            </input>
                            <Button className={classes.newNoteSubmitBtn}
                            onClick={this.newNote}>Submit</Button>
                        </div> : 
                        null
                    }
        
                    <List>
                        {
                           notes.map(( _note, _index) => {
                             return(
                                 <div key= { _index}>
                                     <SidebarItemComponent
                                     _note = {_note}
                                     _index= {_index}
                                     selectedNoteIndex={selectedNoteIndex }
                                     selectNote={this.selectNote}
                                     deleteNote= {this.deleteNote}>
        
                                     </SidebarItemComponent>
                                     <Divider>
                                         
                                     </Divider>
                                 </div>
                             )  
                           })
                        }
                    </List>
        
                </div>
                );
        } 
        
        else{
            return(<div>ADD A NOTE</div>);
        }      
    }
    newNoteBtnClick = () =>{
        this.setState({ title: null, addingNote: !this.state.addingNote });
        console.log('NEW BTN CLICKED');
    }
    updateTitle =(txt) =>{
        this.setState({ title: txt })
        console.log('here it is: ', txt);

    }
    newNote = () =>{
        if(this.state.title !== null){
        this.props.newNote(this.state.title);
        this.setState({title: null, addingNote: false } );
        console.log(this.state);
        }
        else{alert("You Think 😈!! Enter Title.. ");}
        

    }
    selectNote = (n, i) =>{
        this.props.selectNote(n, i);
        console.log('SELECT NOTE');
    }
    deleteNote = (note) =>{
        
        this.props.deleteNote(note);
        console.log('deleteNOTE');
    }
}

export default withStyles(styles)(SidebarComponent);