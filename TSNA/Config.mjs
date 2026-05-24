/**
	This module from TSN Abstracter is in charge of configuring its behavior.  

	### Available Configuration Classes:
	**Logger**: Class used to configure settings related to the TSNA Logger.  
*/

class __Logger{
	/** 
		Class used to configure settings related to the TSNA Logger.  

		### General Settings:
		Settings that are primarily visual or super basic.

		**Disable** : *bool = False*  
		Global toggle to entirely disable the TSNA Loggers.  
		**Display_Date** : *bool = True*  
		Toggle displaying the date at the beginning of Log Entries.  
		**Display_Caller** : *bool = True*  
		Toggle displaying function that called TSNA to Log a brand new Entry.  
		**TSNDL_Group** : *str = "Sun"*  
		Which TSNDL Color Group to use for the Logs' Colors.  

		### File Logger:
		Settings that are related specifically to logging to files.

		**File** : *bool = False*  
		Specifies whenever we allow writing the Log to a File.  
		**File_Level** : *int = 20*  
		The minimum Log level that we should log to a file.  
		**File_Folder** : *str = "Logs"*  
		The relative (or absolute) folder name that will be used to save TSNA Logs.  

		
		### Text Logger
		Settings that are related specifically to logging to the console.

		**Print_Level** : *int = 20*  
		The minimum Log level that we should log to the console.  
	*/
	constructor() {
		this.Disable = false;
		this.Display_Date = true;
		this.Display_Caller = true;
		
		this.TSNDL_Group = "Sun";

		this.Print_Level = 0;
	};
};

var Logger = new __Logger();
export default {
	Logger
};