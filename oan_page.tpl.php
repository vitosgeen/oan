<div class=" shutterstock_block col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
  <div class="shutterstock_block-desc text-left">
    <sub>Sponsored results by Shutterstock <?=$title; ?></sub>
  </div>
  <div class="shutterstock_block-content">
    <div class="shutterstock_block-content-display">
      <?php foreach ($data_rows as $item_row) : ?>

        <div class="shutterstock_block-row col-xs-1 col-sm-1 col-md-1 col-lg-1 text-center">
          <div class="shutterstock_block-row-field">
            <div class="shutterstock_block-row-field-content">
              <a href="/oan-redirect?url=<?= $item_row['affiliate_base64']; ?>">
                <div>
                  <img typeof="foaf:Image" class="img-responsive" src="<?= $item_row['img_src']; ?>" height="100">
                </div>
              </a>
            </div>
          </div>
        </div>

      <?php endforeach; ?>
    </div>
  </div>
</div>
