#------------------------------------------
# Helper functions
#------------------------------------------
Function Delete-Directory {
	Param([string] $path);

	$children = Get-ChildItem $path;
	$childrenCount = $children.Count;
	$currentIndex = 0;
	
	$children | foreach { 
		$currentIndex = $currentIndex + 1;
		Write-Host "Deleting $currentIndex of $($childrenCount): $($_.FullName)"; 
		Remove-Item $_.FullName -Force -Recurse;
	}

	Remove-Item $path -Recurse -Force;
}

Function Get-Confirmation {
	Param([string] $message);

	Write-Host "";
	Write-Host "";
	Write-Host "$message ([y]/n)" -BackgroundColor Yellow -ForegroundColor Black -NoNewLine;
	Write-Host " " -NoNewLine;
	$result = Read-Host;
	return !($result -eq 'n' -or $result -eq 'no');
}



#------------------------------------------
# Variables
#------------------------------------------
$node_modules = "$PSScriptRoot\node_modules";
$packages = "$PSScriptRoot\packages";
$build = "$PSScriptRoot\build";
Write-Host "PSScriptRoot:     $PSScriptRoot";
Write-Host "node_modules:     $node_modules";
Write-Host "build       :     $build";
Start-Sleep -Milliseconds 500;



#------------------------------------------
# Tasks
#------------------------------------------
# -> Delete node_modules & packages
if ((Test-Path $node_modules) -and (Get-Confirmation "Delete the node_modules and packages directories?")) {
	Write-Host "Deleting node_modules directory: $node_modules" -ForegroundColor DarkCyan;
	Delete-Directory $node_modules;
	Write-Host "node_modules directory has been deleted" -ForegroundColor DarkCyan;
	Write-Host "";
	Write-Host "";
	
	if (Test-Path $packages) {
		Write-Host "Deleting packages directory: $packages" -ForegroundColor DarkCyan;
		Delete-Directory $packages;
		Write-Host "packages directory has been deleted" -ForegroundColor DarkCyan;
	}
 else { 
		Write-Host "packages directory not found -- skipping removal" -ForegroundColor Yellow;
	}
}
else { 
	Write-Host "Skipping node_modules and packages directory removal" -ForegroundColor Yellow;
}


# -> Delete build
if ((Test-Path $build) -and (Get-Confirmation "Delete the build directory?")) {
	Write-Host "Deleting build directory: $build" -ForegroundColor DarkCyan;
	Delete-Directory $build;
	Write-Host "build directory has been deleted" -ForegroundColor DarkCyan;

}
else {
	Write-Host "Skipping build directory removal" -ForegroundColor Yellow;
}


# -> NPM cache clean
if (Get-Confirmation "Run npm cache clean?") {
	cd $PSScriptRoot;
	Write-Host "Running npm cache clean" -ForegroundColor DarkCyan;
	npm -g cache clean --force  --loglevel verbose | Out-Null;
	npm cache clean --force  --loglevel verbose | Out-Null;
	Write-Host "NPM cache has been cleaned" -ForegroundColor DarkCyan;
}
else { 
	Write-Host "Skipping npm cache clean" -ForegroundColor Yellow;
}


# -> NPM install and build 
if (Get-Confirmation "Run npm install and build?") {
	Write-Host "Running npm install -- This may take a few minutes"-ForegroundColor DarkCyan;
	npm install --loglevel verbose;
	Write-Host "npm install complete" -ForegroundColor DarkCyan;
	
	Write-Host "";
	Write-Host "";
	Write-Host "Running npm build -- This may take a few minutes"-ForegroundColor DarkCyan;
	npm run build --loglevel verbose;
	Write-Host "npm build complete" -ForegroundColor DarkCyan;
}
else { 
	Write-Host "Skipping npm install and build" -ForegroundColor Yellow;
}



#------------------------------------------
# Complete
#------------------------------------------
Write-Host "";
Write-Host "";
Write-Host "Complete!" -ForegroundColor Green;
Start-Sleep -Seconds 2;