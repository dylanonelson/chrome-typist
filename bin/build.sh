dir_name="builds/"
dir_name=$dir_name$(basename $(pwd))-
dir_name=$dir_name$(date +"%Y-%m-%d_%H-%M-%S.%s")
mkdir -p $dir_name
cp -R dist $dir_name
cp ./manifest.json $dir_name
zip -r "$dir_name.zip" $dir_name
